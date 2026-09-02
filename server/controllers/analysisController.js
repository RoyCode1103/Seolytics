
import Analysis from "../models/Analysis.js";
import {scrapeUrl} from "../services/scraperService.js";
import { analyzeSeoData } from "../services/geminiService.js";

//Analysis a URL
export const analyzeUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) return res.status(400).json({success: false, message: "URL is required" });

// Validate URL format
let validUrl;
            try {
                validUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
            } catch(error) {
                return res.status(400).json({success: false, message: "Invalid URL format" });
} 
    //Create Analysis record with pending status
    const analysis = await Analysis.create({userId: req.userId, url: validUrl.href,
        status: "processing"});

        //Send immediate response with analysis ID
        res.json({success: true, message: "Analysis started", analysisId: analysis._id})

        //Run scraping and analysis in background
        try{
            // 1. Scrap the URL with BrowserBase
            const scrapeResult = await scrapeUrl(validUrl.href)

            if(!scrapeResult.success){
                analysis.status = "failed";
                await analysis.save();
                return;
            }

            // 2. Analyze with Gemini AI 
            const aiResult = await analyzeSeoData(scrapeResult.data)

            if(!aiResult.success){
                analysis.status = "failed";
                await analysis.save()
                return;
            }

            // 3. Save results
            const categories = {
                seo: Number(aiResult.data.categories?.seo) || 0,
                performance: Number(aiResult.data.categories?.performance) || 0,
                accessibility: Number(aiResult.data.categories?.accessibility) || 0,
                bestPractices: Number(aiResult.data.categories?.bestPractices) || 0,
            };

            // Gemini normally returns overallScore. If it does not, calculate it
            // from the four category scores so the report can never get NaN.
            const aiOverallScore = Number(aiResult.data.overallScore);
            const calculatedOverallScore = Math.round(
                (categories.seo + categories.performance + categories.accessibility + categories.bestPractices) / 4
            );
            analysis.overallScore = Number.isFinite(aiOverallScore)
                ? Math.max(0, Math.min(100, aiOverallScore))
                : calculatedOverallScore;
            analysis.categories = categories;
            analysis.metaData = scrapeResult.data.metaData || {};
            analysis.headings = scrapeResult.data.headings || {};
            analysis.links = scrapeResult.data.links || {};
            analysis.images = scrapeResult.data.images || {};
            analysis.keywords = aiResult.data.keywords || [];
            analysis.issues = aiResult.data.issues || [];
            analysis.loadTime = scrapeResult.data.loadTime || 0;
            analysis.pageSize = scrapeResult.data.pageSize || 0;
            analysis.wordCount = scrapeResult.data.wordCount || 0;
            analysis.status = "completed";

            await analysis.save();




        }catch(bgError){
                console.error("Background analysis error: ", bgError.message);
                try{
                    analysis.status = "failed";
                    await analysis.save()
                }catch(saveError){
                    console.error("Failed to save status: ", saveError.message);
                }
        }       

    }catch (error) {
        console.error("Analyze URL error: ", error.message);
        if(!res.headersSent){
            res.status(500).json({success: false, message: "server error"})
        }
}
}


//Get analysis by ID
export const getAnalysis = async(req, res) => {
    try{
        const analysis = await Analysis.findOne({_id: req.params.id, userId: req.userId}).lean();

        if(!analysis) return res.status(404).json({success: false, message: "Analysis not found"});

        // Older documents used the incorrect `overallscore` field. Keep them
        // readable after fixing the schema to `overallScore`.
        if (analysis.overallScore === undefined || analysis.overallScore === null || Number(analysis.overallScore) === 0) {
            const legacyScore = Number(analysis.overallscore);
            const categoryAverage = Math.round((
                Number(analysis.categories?.seo) +
                Number(analysis.categories?.performance) +
                Number(analysis.categories?.accessibility) +
                Number(analysis.categories?.bestPractices)
            ) / 4);
            analysis.overallScore = Number.isFinite(legacyScore) && legacyScore > 0
                ? legacyScore
                : (Number.isFinite(categoryAverage) ? categoryAverage : 0);
        }
        delete analysis.overallscore;

        res.json({success: true, analysis});
    }catch(error){
            console.error("Get analysis error: ", error.message);
            res.status(500).json({success: false, message: "Server error"});
    }
}


//Get all analyses for user
export const getAnalyses = async(req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const analyses = await Analysis.find({userId: req.userId})
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .select("-issues -keywords")
            .lean();

        // Normalize old records that were saved with `overallscore`.
        analyses.forEach((item) => {
            if (item.overallScore === undefined || item.overallScore === null || Number(item.overallScore) === 0) {
                const legacyScore = Number(item.overallscore);
                const categoryAverage = Math.round((
                    Number(item.categories?.seo) +
                    Number(item.categories?.performance) +
                    Number(item.categories?.accessibility) +
                    Number(item.categories?.bestPractices)
                ) / 4);
                item.overallScore = Number.isFinite(legacyScore) && legacyScore > 0
                    ? legacyScore
                    : (Number.isFinite(categoryAverage) ? categoryAverage : 0);
            }
            delete item.overallscore;
        });

        const total = await Analysis.countDocuments({userId: req.userId})

        res.json({success: true, analyses, pagination: {page, limit, total, pages: Math.ceil(total / limit)}});

    }catch(error){
            console.error("Get analyses error: ", error.message);
            res.status(500).json({success: false, message: "Server error"});
    }
}


// Delete analysis
export const deleteAnalysis = async(req, res) => {
    try{
        const deleted = await Analysis.findOneAndDelete({_id: req.params.id, userId: req.userId});

        if (!deleted) {
            return res.status(404).json({success: false, message: "Analysis not found"});
        }

        res.json({success: true, message: "Analysis deleted"});

    }catch(error){
            console.error("Delete analysis error: ", error.message);
            res.status(500).json({success: false, message: "Server error"});
    }
}

