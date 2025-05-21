// src/_data/site.js - Global site data
module.exports = {
    // Basic site info
    title: "My Blog",
    description: "A minimal and professional blog with Georgia font",
    url: "https://myblog.com", // Replace with your actual URL when deployed

    // Author information
    author: {
        name: "Your Name",
        email: "your.email@example.com",
        bio: "A brief description about yourself"
    },

    // Navigation links
    navigation: [
        { text: "Home", url: "/" },
        { text: "Posts", url: "/posts/" },
        { text: "About", url: "/about/" },
        { text: "Tags", url: "/tags/" }
    ],

    // Social media links
    social: {
        github: "https://github.com/yourusername",
        twitter: "https://twitter.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername"
    },

    // Site settings
    enableSearch: false,
    enableDarkMode: true,
    showReadingTime: true,

    // Footer text
    footerText: "All rights reserved.",

    // Dynamic current year (for copyright)
    currentYear: new Date().getFullYear()
};