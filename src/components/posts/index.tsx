import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Input,
  Popconfirm,
  Select,
  Pagination,
  PaginationProps,
  Modal,
  Skeleton,
  notification,
} from "antd";
import Button from "../uiKit/button";
import { useTranslation } from "react-i18next";
import { StyledContainer } from "./style";
import { getAllPosts } from "../../api/posts";
import EditSvg from "../../assets/svg/edit";
import DeleteSvg from "../../assets/svg/deleteSvg";
import { createPostApi } from "../../api/posts";
import { updatePostApi } from "../../api/posts";
import { getPostByIdApi } from "../../api/posts";
import { getCategoriesApi } from "../../api/category";
import { deletePostApi } from "../../api/posts";
import UploadImage from "../../assets/image/upload.png";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const PostComponent = () => {
  const [form] = Form.useForm();
  const [postsList, setPostsList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [paginationIndex, setPaginationIndex] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [postItem, setPostItem] = useState({
    title: "",
    description: "",
    category: "",
  });
  const Context = React.createContext({ name: "Default" });
  const [api, contextHolder] = notification.useNotification();

  const { t } = useTranslation();

  const showModal = () => {
    setIsModalOpen(true);
    setPreviewUrl(null)
  };

  function confirm(id: any) {
    deletePostItem(id);
  }

  function cancel(e: any) {}
  const updatePostItem = (newData: any) => {
    setPostItem((prevPostItem) => ({
      ...prevPostItem,
      title: newData.title,
      description: newData.description,
      category: newData.category.id,
    }));
  };

  const handleCancel = () => {
    debugger;
    setPostItem((prevPostItem) => ({
      ...prevPostItem,
      title: "",
      description: "",
      category: "",
    }));
    setPreviewUrl(null);
    form.resetFields();
    setIsModalOpen(false);
    setIsEdit(false);
    setEditId(0);
  };

  const getPosts = async (pageIndex: number) => {
    try {
      const res = await getAllPosts(pageSize, pageIndex);
      if (res.status == 200) {
        setPostsList(res.data.results);
        setTotalCount(res.data.count);
        setIsModalOpen(false);
      }
    } catch (error: any) {
      api.error({
        message: "Error",
        description: error.response.data.detail,
        placement: "topLeft",
      });
    }
  };

  const pageOnChange: PaginationProps["onChange"] = (page) => {
    setPageIndex(page - 1);
    setPaginationIndex(page);
    getPosts(page - 1);
  };

  const getAllCategories = async () => {
    try {
      const res = await getCategoriesApi();
      if (res.status == 200) {
        setCategories(res.data);
      }
    } catch (error: any) {
      api.error({
        message: "Error",
        description: error.response.data.detail,
        placement: "topLeft",
      });
    }
  };

  const getPostItem = async (id: any) => {
    debugger;
    try {
      const res = await getPostByIdApi(id);
      if (res.status == 200) {
        updatePostItem(res.data);
        setPreviewUrl(res.data.image);

        setIsModalOpen(true);
      }
    } catch (error: any) {
      api.error({
        message: "Error",
        description: error.response.data.detail,
        placement: "topLeft",
      });
    }
  };
  const deletePostItem = async (id: any) => {
    try {
      const res = await deletePostApi(id);
      if (res?.status == 204) {
        getPosts(pageIndex);
      }
    } catch (error: any) {
      api.error({
        message: "Error",
        description: error.response.data.detail,
        placement: "topLeft",
      });
    }
  };

  const handeleEdit = (id: any) => {
    setIsEdit(true);
    setEditId(id);
    getPostItem(id);
  };
  useEffect(() => {
    getPosts(pageIndex);
    getAllCategories();
  }, []);
  const onFinish = async (values: any) => {
    debugger;
    debugger;

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
          getPosts(pageIndex);
          form.resetFields();
        }
      } else {
        const res = await createPostApi({
          title: values.title,
          description: values.description,
          category: values.category,
          image: selectedFile,
        });
        if (res) {
          setPageIndex(1);
          getPosts(0);
          form.resetFields();
        }
      }
    } catch (error: any) {
      api.error({
        message: "Error",
        description: error.response.data.detail,
        placement: "topLeft",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  type FieldType = {
    title?: string;
    description?: string;
    category: string;
    image: File;
  };

  const handlePreviewClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const file = event.target.files?.[0];
    setSelectedFile(event.target.files?.[0]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      title: postItem.title,
      description: postItem.description,
      category: postItem.category,
    });
  }, [postItem, form]);

  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <StyledContainer>
      {contextHolder}
      <div>
        <Button type="primary" onClick={showModal}>
          Add
        </Button>
      </div>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <>
          {postsList.map((item: any) => (
            <div className="card">
              <div style={{ flexGrow: "1" }}>
                <img className="image" src={item.image} />
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
          <Pagination
            defaultPageSize={pageSize}
            defaultCurrent={paginationIndex}
            onChange={pageOnChange}
            total={totalCount}
            showSizeChanger={false}
          />
        </>
      )}

      <Modal
        title={isEdit ? "Edite Post" : "Add Post"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {/* <PostForm
          onFinish={onFinish}
          postItem={postItem}
          handleCancel={handleCancel}
          onFinishFailed={onFinishFailed}
          isEdit={isEdit}
        /> */}
        {postItem && postItem.title != "" ? <p>aaaaa</p> : ""}
        <Form
          name="addPost"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item<FieldType>
            label={t("title")}
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("category")}
            name="category"
            rules={[{ required: true }]}
          >
            <Select
              options={categories.map((item: any) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("description")}
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("image")}
            rules={[{ required: true }]}
            name="image"
          >
            {/* <input type="file" onChange={handleFileUpload} /> */}

            <div className="preview-section" onClick={handlePreviewClick}>
              {previewUrl ? (
                <div className="card-image">
                  <img
                    src={previewUrl}
                    alt="File Preview"
                    className="img-fluid"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              ) : (
                <div className="upload-placeholder">
                  <img
                    src={UploadImage}
                    alt="File Preview"
                    className="img-fluid"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" hasLoading={true}>
              {isEdit ? t("Edit") : t("Add")}
            </Button>

            <Button
              type="text"
              onClick={handleCancel}
              style={{ margin: "0 10px" }}
            >
              {t("cancel")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </StyledContainer>
  );
};

export default PostComponent;
