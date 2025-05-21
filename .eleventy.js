const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
    // Passthrough copy for assets
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");

    // Date formatting filters
    eleventyConfig.addFilter("dateIso", (date) => {
        return DateTime.fromJSDate(date).toISO();
    });

    eleventyConfig.addFilter("dateReadable", (date) => {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
    });

    eleventyConfig.addFilter("dateYear", (date) => {
        return DateTime.fromJSDate(date).toFormat("yyyy");
    });

    // Current year shortcode
    eleventyConfig.addShortcode("year", () => {
        return new Date().getFullYear();
    });

    // Get the first `n` elements of a collection
    eleventyConfig.addFilter("head", (array, n) => {
        if(!Array.isArray(array) || array.length === 0) {
            return [];
        }
        return array.slice(0, n);
    });

    // Limit filter
    eleventyConfig.addFilter("limit", function(array, limit) {
        return array.slice(0, limit);
    });

    // Get all unique tags
    eleventyConfig.addCollection("tagList", function(collection) {
        const tagSet = new Set();
        collection.getAll().forEach(item => {
            if("tags" in item.data) {
                let tags = item.data.tags;
                if(typeof tags === "string") {
                    tags = [tags];
                }
                tags.filter(tag => !['post', 'all'].includes(tag)).forEach(tag => tagSet.add(tag));
            }
        });
        return [...tagSet].sort();
    });

    // Create the posts collection
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("src/posts/**/*.md").sort((a, b) => {
            return b.date - a.date; // Sort by date in descending order
        });
    });

    // Customize Markdown library
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        permalink: true,
        permalinkClass: "direct-link",
        permalinkSymbol: "#"
    });

    eleventyConfig.setLibrary("md", markdownLibrary);

    // Browsersync config
    eleventyConfig.setBrowserSyncConfig({
        ui: false,
        ghostMode: false,
        callbacks: {
            ready: function(err, bs) {
                bs.addMiddleware("*", (req, res) => {
                    const content_404 = fs.readFileSync('_site/404.html');
                    res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
                    res.write(content_404);
                    res.end();
                });
            }
        }
    });

    // Return your configuration object
    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            layouts: "_includes/layouts",
            data: "_data"
        },
        templateFormats: ["md", "njk", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        passthroughFileCopy: true
    };
};