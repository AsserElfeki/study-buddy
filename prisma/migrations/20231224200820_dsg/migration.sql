/*
  Warnings:

  - You are about to drop the column `likesCount` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[post_id,author_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "likesCount";

-- CreateIndex
CREATE UNIQUE INDEX "likes_post_id_author_id_key" ON "likes"("post_id", "author_id");
