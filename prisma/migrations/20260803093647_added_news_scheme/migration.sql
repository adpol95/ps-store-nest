-- CreateEnum
CREATE TYPE "NewsCategory" AS ENUM ('PS5', 'PS4', 'PS_VR2', 'PS_STORE', 'PS_PLUS');

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "NewsCategory" NOT NULL,
    "cover_url" TEXT NOT NULL,
    "header_title" TEXT,
    "author_name" TEXT,
    "author_description" TEXT,
    "main_imgs" TEXT[],
    "content" JSONB NOT NULL,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");
