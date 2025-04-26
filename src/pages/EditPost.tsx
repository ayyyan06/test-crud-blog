import React, { useEffect, useState } from "react"
import { Button, Input, Typography } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { editPost, getPostById } from "../api/PostService"

const { TextArea } = Input

const EditPost: React.FC = () => {
  const [id, setId] = useState<string | null>(null)
  const [title, setTitle] = useState<string>("")
  const [text, setText] = useState<string>("")
  const [errorTitle, setErrorTitle] = useState<'' | 'warning' | 'error' | undefined>('')
  const [errorText, setErrorText] = useState<'' | 'warning' | 'error' | undefined>('')
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()

  useEffect(() => {
    const fetchPost = async () => {
      if (params.id) {
        try {
          const res = await getPostById(params.id)
          setTitle(res.title)
          setText(res.text)
          setId(res.id)
        } catch (error) {
          console.error("Failed to fetch post", error)
          alert("Failed to load post")
        }
      } else {
        alert("Post ID is missing")
        navigate('/')
      }
    }
    fetchPost()
  }, [params.id, navigate])

  const handleSubmit = async () => { 
    if (title.length < 4 || text.length < 4) {
      setErrorTitle(title.length < 4 ? 'error' : '')
      setErrorText(text.length < 4 ? 'error' : '')
      return
    }

    try {
      if (id) {
        await editPost(id, title, text)
        alert('You have successfully edited post!')
        navigate('/')
      }
    } catch (error) {
      console.error("Failed to edit post", error)
      alert("Failed to edit post")
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={4}>Edit a Post</Typography.Title>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        status={errorTitle}
      />
      {errorTitle === 'error' && (
        <p style={{ color: 'red', marginTop: 10 }}>Minimum size 4 elements</p>
      )}

      <TextArea
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoSize={{ minRows: 3 }}
        style={{ marginTop: 16 }}
        status={errorText}
      />
      {errorText === 'error' && (
        <p style={{ color: 'red', marginTop: 10 }}>Minimum size 4 elements</p>
      )}

      <Button type="primary" style={{ marginTop: 16 }} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default EditPost
