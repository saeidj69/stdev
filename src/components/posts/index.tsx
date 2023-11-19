import React, { useEffect, useState } from "react";
import { Form, Input, Popconfirm, message } from "antd";
import { useTranslation } from "react-i18next";
import { StyledContainer } from "./style";
import { Button, Modal } from "antd";
import { getAllPosts } from "../../api/posts";
import PostImage from "../../assets/images/post.png";
import EditSvg from "../../assets/svg/edit";
import DeleteSvg from "../../assets/svg/deleteSvg";
import { createPostApi } from "../../api/posts";
import { updatePostApi } from "../../api/posts";
import { getPostByIdApi } from "../../api/posts";
import { deletePostApi } from "../../api/posts";
const { TextArea } = Input;
const PostComponent = () => {
  const [postsList, setPostsList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(0);
  const [postItem, setPostItem] = useState({
    title: "",
    description: "",
    category: "",
  });
  const handleFileUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const { t } = useTranslation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  function confirm(id: any) {
    deletePostItem(id);
  }

  function cancel(e: any) {}

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setEditId(0);
  };

  const getPosts = async () => {
    const res = await getAllPosts();
    if (res.status == 200) {
      setPostsList(res.data.results);
      setIsModalOpen(false);
    }
  };

  const getPostItem = async (id: any) => {
    const res = await getPostByIdApi(id);
    if (res.status == 200) {
      setPostItem({
        title: res.data.title,
        description: res.data.description,
        category: res.data.category.name,
      });
      setIsModalOpen(true);
    }
  };
  const deletePostItem = async (id: any) => {
    debugger;
    const res = await deletePostApi(id);
    if (res?.status == 204) {
      getPosts();
    }
  };

  const handeleEdit = (id: any) => {
    setIsEdit(true);
    setEditId(id);
    getPostItem(id);
  };
  useEffect(() => {
    getPosts();
  }, []);
  const onFinish = async (values: any) => {
    try {
      if (isEdit) {
        const res = await updatePostApi(
          {
            title: values.title,
            description: values.description,
            category: values.category,
            image: selectedFile,
          },
          editId
        );
        if (res) {
          getPosts();
        }
      } else {
        const res = await createPostApi({
          title: values.title,
          description: values.description,
          category: values.category,
          image: selectedFile,
        });
        if (res) {
          getPosts();
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  type FieldType = {
    title?: string;
    description?: string;
    category: string;
    image: File;
  };
  return (
    <StyledContainer>
      <div>
        <Button type="primary" onClick={showModal}>
          Add
        </Button>
      </div>
      {postsList.map((item: any) => (
        <div className="card">
          <div style={{ flexGrow: "1" }}>
            <img  className="image" src={item.image} />
          </div>
          <div className="info" style={{ flexGrow: "3" }}>
            <div>
              <p>Name</p>
              <span>{item.title}</span>
            </div>
            <div>
              <p>Description</p>
              <span>{item.description}</span>
            </div>
            <div>
              <p>Category</p>
              <span>{item.category.name}</span>
            </div>
          </div>
          <div style={{ flexGrow: "1" }} className="actions">
            <EditSvg onClick={() => handeleEdit(item.id)} />
            <Popconfirm
              title="Are you sure delete this item?"
              onConfirm={() => confirm(item.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteSvg />
            </Popconfirm>
          </div>
        </div>
      ))}
      <Modal
        title={isEdit ? "Edite Post" : "Add Post"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            title: postItem.title,
            description: postItem.description,
            category: postItem.category,
          }}
        >
          <Form.Item<FieldType>
            label={t("title")}
            name="title"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("category")}
            name="category"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("description")}
            name="description"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<FieldType> label={t("image")} name="image">
            <input type="file" onChange={handleFileUpload} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {isEdit?t("Edit"):t("Add")}
            </Button>

            <Button onClick={handleCancel} style={{ margin: "0 10px" }}>
              {t("cancel")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </StyledContainer>
  );
};

export default PostComponent;
