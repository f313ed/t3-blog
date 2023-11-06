import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      })
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: 'desc' },
    })
  }),

  // ブログ記事一覧を取得する
  getAllBlogs: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany()
  }),

  // ブログ投稿
  postBlog: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const postBlog = await ctx.db.post.create({
        data: {
          name: input.title,
          title: input.title,
          description: input.description,
        },
      })
      return postBlog
    }),

  // ブログ記事を取得する
  getDetailBlog: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          id: input.id,
        },
      })
    }),

  // ブログ記事削除
  deleteBlog: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
