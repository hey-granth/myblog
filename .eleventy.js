module.exports = function(eleventyConfig) {
    // Copy the `css` directory to the output
    eleventyConfig.addPassthroughCopy("src/css");

    // Return your object options
    return {
        dir: {
            input: "src",       // Source directory
            output: "_site",    // Output directory
            includes: "_includes", // Layouts directory
            layouts: "_includes/layouts", // Alternative layouts directory
            data: "_data"       // Data directory
        },
        templateFormats: ["md", "njk", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};