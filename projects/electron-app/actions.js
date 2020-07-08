import { get, uploadPhoto, create, update, remove } from "./request.js";
import { initFormData } from "./state.js";

export const fetchJSONData = async (dispatch, options) => {
  try {
    const projects = await get();

    dispatch(options.onResponse, projects);
  } catch (error) {
    console.log(error);
    dispatch(options.onResponse, {});
  }
};

export const setProjectList = (state, projects) => {
  return {
    ...state,
    projectList: projects.data.data,
  };
};

export const showModal = (state, { formType, project = initFormData }) => {
  return {
    ...state,
    showModal: true,
    formType,
    formData: project,
  };
};

export const hideModal = (state) => ({ ...state, showModal: false });

export const resetForm = (state) => ({
  ...state,
  formData: initFormData,
  formType: "create",
});

export const submitForm = (state, e) => {
  e.preventDefault();
  const { formType } = state;

  return [
    state,
    [
      formType === "create" ? createProject : updateProject,
      {
        data: state.formData,
        onStart: [setLoading, true],
        onFinish: [setLoading, false],
        onResponse: fetchJSONData,
      },
    ],
  ];
};

export const onChangeTextField = (state, e) => {
  const {
    target: { value, name },
  } = e;
  const { formData } = state;

  return { ...state, formData: { ...formData, [name]: value } };
};

export const onChangeFileField = (state, e) => {
  const {
    target: { files, name },
  } = e;
  const { formData } = state;
  const formdata = new FormData();

  for (let i = 0; i < files.length; i++) {
    formdata.append("files", files[i]);
  }

  return [
    { ...state, formData: { ...formData, [name]: formdata } },
    [
      (dispatch, options) => upload(dispatch, options, name),
      {
        formdata,
        onStart: [setLoading, true],
        onFinish: [setLoading, false],
        onResponse: setPhotoFormData,
      },
    ],
  ];
};

const setLoading = (state, status) => ({ ...state, loading: status });

const setPhotoFormData = (state, data) => {
  const { formData } = state;
  const { name, urls } = data;

  return {
    ...state,
    formData: { ...formData, [name]: name === "logo" ? urls[0] : urls },
  };
};

export const createProject = async (dispatch, options) => {
  dispatch(options.onStart);

  try {
    await create(options.data);
    dispatch(resetForm);
    await options.onResponse(dispatch, { onResponse: setProjectList });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(options.onFinish);
  }
};

export const updateProject = async (dispatch, options) => {
  dispatch(options.onStart);

  try {
    await update(options.data);
    dispatch(resetForm);
    await options.onResponse(dispatch, { onResponse: setProjectList });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(options.onFinish);
  }
};

export const deleteProject = (state, id) => {
  try {
    if (confirm("Do you want to delete?")) {
      const { projectList } = state;

      return [
        {
          ...state,
          projectList: projectList.filter((project) => project.id !== id),
        },
        [removeProject, { id, onResponse: fetchJSONData }],
      ];
    }

    return state;
  } catch (error) {
    console.log(error);
  }
};

const removeProject = async (dispatch, options) => {
  await remove(options.id);
  dispatch(options.onResponse);
};

const upload = async (dispatch, options, name) => {
  dispatch(options.onStart);

  try {
    const {
      data: { urls },
    } = await uploadPhoto(options.formdata);

    dispatch(options.onResponse, { urls, name });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(options.onFinish);
  }
};
