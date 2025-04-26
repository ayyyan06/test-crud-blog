import React, { useEffect, useState } from "react"
import { Post } from "../types/post"
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Card, Button, Space, Typography } from 'antd'
import { useNavigate } from "react-router-dom"
import { getPosts } from "../api/PostService"
import { deletePost } from "../api/PostService"

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        getPosts()
            .then((res) => {
                setPosts(res)
            })
            .catch((error) => {
                alert('Failed to load posts')
                console.log(error)
            })
    }, [])

    const handleEdit = (postId: string) => {
        navigate(`edit/${postId}`)
    }

    const handleDelete = async (postId: string) => {
        try {
            await deletePost(postId)
            setPosts(posts.filter(post => post.id !== postId))
            alert('You have successfully deleted the post!')
        } catch (error) {
            alert('Failed to delete post')
            console.log(error)
        }
    }

    const handleView = (postId: string) => {
        navigate(`post/${postId}`)
    }

    const cardStyle = {
        minWidth: 300,
        marginBottom: 50,
        border: '1px solid rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }

    return (
        <div>
            <Typography.Title level={4}>Posts</Typography.Title>
            {posts.map((post) => {
                return (
                    <Card
                        key={post.id}
                        style={cardStyle}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1, marginRight: 40 }}>
                                <Typography.Title level={5}>{post.title}</Typography.Title>
                                <p>{post.text}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Space direction="vertical" size="small">
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEdit(post.id)}
                                        style={{ marginBottom: 10, width: 140 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        type="primary"
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDelete(post.id)}
                                        style={{ marginBottom: 10, width: 140 }}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        type="primary"
                                        icon={<EyeOutlined />}
                                        onClick={() => handleView(post.id)}
                                        style={{ width: 140 }}
                                    >
                                        View Full Post
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default Home
