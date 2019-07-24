const { Comment, Post } = require('../models')
const NotFoundError = require('../exceptions/NotFoundError')
const ForbiddenError = require('../exceptions/ForbiddenError')

class CommentController {
  async index ({ params }, response) {
    const { post_id } = params
    const comments = await Comment.findAll({ where: { post_id }, include: 'owner' })

    return response.json(comments)
  }

  async store ({ params, body, auth }, response) {
    const { post_id } = params
    const post = await Post.findByPk(post_id)

    if (!post) {
      throw new NotFoundError('Post not found')
    }

    const comment = await Comment.create({
      ...body,
      post_id,
      user_id: auth.user.id
    })

    return response.status(201).json(comment)
  }

  async update ({ params, body, auth }, response) {
    const { id, post_id } = params
    const comment = await Comment.findOne({ where: { id, post_id } })

    if (!comment) {
      throw new NotFoundError()
    }

    if (auth.user.id !== comment.user_id) {
      throw new ForbiddenError()
    }

    await comment.update(body)

    return response.json(comment)
  }

  async destroy ({ params, auth }, response) {
    const { id, post_id } = params
    const comment = await Comment.findOne({ where: { id, post_id } })

    if (!comment) {
      throw new NotFoundError()
    }

    if (auth.user.id !== comment.user_id) {
      throw new ForbiddenError()
    }

    await comment.destroy()

    return response.status(204).json()
  }
}

module.exports = new CommentController()
