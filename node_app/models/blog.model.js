module.exports = mongoose => {
    const Blog = mongoose.model(
        "blog",
        mongoose.Schema(
            {
                title: String,
                description: String,
                article: String,
                published: Boolean,
                image: {
                    data: Buffer,
                    contentType: String
                }
            },
            { timestamps: true }
        )
    );
    return Blog;
};