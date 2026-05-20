/**
 * AI Service Mock
 * Restored to resolve import errors in blogController.js
 */

export const generateBlogTopics = async () => {
    return [
        "Top 10 Tips for Renting in 2026",
        "How to Decorate a Small Apartment",
        "Understanding Lease Agreements"
    ];
};

export const generateBlogSummary = async (content) => {
    return "This is an auto-generated summary based on the provided content.";
};

export const improveContent = async (content) => {
    return content;
};

export const personalizeFeed = async (userId, userHistory) => {
    return {
        recommendedCategories: []
    };
};
