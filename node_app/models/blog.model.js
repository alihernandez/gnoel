module.exports = mongoose => {
    const Blog = mongoose.model(
        "blog",
        mongoose.Schema(
            {
                title: String,
                description: String,
                article: String,
                published: Boolean,
                img: {
                    data: Buffer,
                    contentType: String
                }
            },
            { timestamps: true }
        )
    );
    return Blog;
};