'use client'

import { useParams, useRouter } from 'next/navigation'
import { debugPort } from 'process'
import { api } from '~/trpc/react'

const DetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const perseNumberId = id ? Number(id) : NaN
  const blog = api.post.getDetailBlog.useQuery({ id: perseNumberId })
  const deleteBlog = api.post.deleteBlog.useMutation({
    onSuccess: () => {
      router.refresh()
    },
  })

  const handleDelete = async () => {
    if (window.confirm('削除しますか？')) {
      try {
        deleteBlog.mutate({ id: perseNumberId })
        router.push('/blog/')
      } catch (error) {}
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold">{blog.data?.title}</h1>
        <div className="mb-8 text-sm text-gray-500">
          <span>{blog.data?.createdAt.toLocaleDateString()}</span>{' '}
          {/* Created Atが必要ならば、表示 */}
        </div>
        <p className="whitespace-pre-line text-gray-700">
          {blog.data?.description}
        </p>
        <button
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </main>
  )
}

export default DetailPage
