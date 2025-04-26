import React, { useEffect, useState } from "react";
import { Row, Typography, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deletePost, getPostById } from "../api/PostService";

const FullPost: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 

    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                try {
                    const res = await getPostById(id);
                    setTitle(res.title);
                    setText(res.text);
                } catch (error) {
                    console.error("Failed to fetch post", error);
                    alert("Failed to load post");
                }
            } else {
                alert("Post ID is missing");
                navigate('/');
            }
        };
        fetchPost();
    }, [id, navigate]);

    const handleEdit = () => {
        if (id) {
            navigate(`/edit/${id}`);
        }
    };

    const handleDelete = async () => {
        if (id) {
            try {
                await deletePost(id);
                alert("Post deleted successfully");
                navigate('/'); 
            } catch (error) {
                console.error("Failed to delete post", error);
                alert("Failed to delete post");
            }
        }
    };

    return (
        <>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Typography.Text style={{ marginBottom: 40, fontSize: 20 }}>{text}</Typography.Text>
            <Row style={{ marginTop: 40 }}>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                    style={{ marginBottom: 10, width: 140, marginRight: 30 }}
                >
                    Edit
                </Button>
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                    style={{ width: 140, marginRight: 30 }}
                >
                    Delete
                </Button>
            </Row>
        </>
    );
};

export default FullPost;
