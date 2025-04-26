import React, { useState } from "react";
import { Button, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { addPost } from "../api/PostService";

const { TextArea } = Input;

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorTitle, setErrorTitle] = useState<'' | 'warning' | 'error' | undefined>('');
  const [errorText, setErrorText] = useState<'' | 'warning' | 'error' | undefined>('');
  const navigate = useNavigate()
  
  
  const handleSubmit = async() => { 
    if (title.length < 4 || text.length < 4) {
      setErrorTitle(title.length < 4 ? 'error' : '')
      setErrorText(text.length < 4 ? 'error' : '')
      return
    }

    try {
        addPost(title, text)
        alert('Successfully added new post!')
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={4}>Create a Post</Typography.Title>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        status={errorTitle}
      />
      {errorTitle === 'error' && (
        <p style={{color: 'red', marginTop: 10}}>Minimum size 4 elements</p>
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
        <p style={{color: 'red', marginTop: 10}}>Minimum size 4 elements</p>
      )}

      <Button type="primary" style={{ marginTop: 16 }} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default CreatePost;
