module.exports = mongoose => {
    const Blog = mongoose.model(
        "blog",
        mongoose.Schema(
            {
                title: String,
                description: String,
                article: String,
                image: {
                    data: Buffer,
                    contentType: String,
                },
                published: Boolean
            },
            { timestamps: true }
        )
    );
    return Blog;
};