import { h } from "https://unpkg.com/hyperapp";
import {
  showModal,
  hideModal,
  resetForm,
  submitForm,
  onChangeTextField,
  onChangeFileField,
  deleteProject,
} from "./actions.js";

const Header = (props) => {
  return h(
    "header",
    { class: "header" },
    h(
      "button",
      { class: "header__button", onclick: [showModal, { formType: "create" }] },
      "Add new project"
    )
  );
};

const ProjectItem = (project) => {
  return h("tr", { class: "project__list__item" }, [
    h(
      "td",
      { class: "project__list__item__logo" },
      h("img", { src: project.logo, alt: project.title })
    ),
    h("td", { class: "project__list__item__title" }, project.title),
    h("td", { class: "project__list__item__actions" }, [
      h(
        "button",
        {
          class: "project__list__item__actions__update",
          onclick: [showModal, { formType: "update", project }],
        },
        "Update"
      ),
      h(
        "button",
        {
          class: "project__list__item__actions__delete",
          onclick: [deleteProject, project.id],
        },
        "Delete"
      ),
    ]),
  ]);
};

const ProjectList = (props) => {
  const headData = ["Logo", "Title", "Action"];

  return h("table", { class: "project__list" }, [
    h(
      "thead",
      { class: "project__list__head" },
      h(
        "tr",
        null,
        headData.map((data, index) => h("th", { key: index }, data))
      )
    ),
    h("tbody", { class: "project__list__body" }, null, [
      props.projectList.map((project) => ProjectItem(project)),
    ]),
  ]);
};

const Form = (props) => {
  const { title, logo, description, url, screenshots } = props;

  return h(
    "form",
    { class: "project__form", id: "project__form", onsubmit: submitForm },
    [
      h("div", { class: "project__form-control" }, [
        h("label", { for: "title" }, "Title"),
        h("input", {
          type: "text",
          id: "title",
          name: "title",
          value: title,
          oninput: onChangeTextField,
        }),
      ]),
      h("div", { class: "project__form-control" }, [
        h("label", { for: "url" }, "URL"),
        h("input", {
          type: "url",
          id: "url",
          name: "url",
          value: url,
          oninput: onChangeTextField,
        }),
      ]),
      h("div", { class: "project__form-control" }, [
        h("label", { for: "logo" }, "Logo"),
        h("input", {
          type: "file",
          id: "logo",
          name: "logo",
          accept: "image/*",
          oninput: onChangeFileField,
        }),
        !!logo &&
          h(
            "div",
            { class: "logo__container" },
            h("img", { class: "logo", src: logo, alt: title })
          ),
      ]),
      h("div", { class: "project__form-control" }, [
        h("label", { for: "description" }, "Description"),
        h("textarea", {
          id: "description",
          name: "description",
          value: description,
          oninput: onChangeTextField,
        }),
      ]),
      h("div", { class: "project__form-control" }, [
        h("label", { for: "screenshots" }, "Screenshots"),
        h("input", {
          type: "file",
          id: "screenshots",
          name: "screenshots",
          accept: "image/*",
          multiple: true,
          oninput: onChangeFileField,
        }),
        h(
          "div",
          { class: "screenshots__container" },
          screenshots.map((screenshot, index) =>
            h("img", {
              class: "screenshot",
              src: screenshot,
              alt: `screenshot-${index}`,
            })
          )
        ),
      ]),
      h("div", { class: "project__form-control" }, [
        h("input", { type: "submit" }, "Save"),
        h("input", { type: "reset", onclick: resetForm }, "Reset"),
      ]),
    ]
  );
};

const Modal = (props) => {
  const { showModal, formData } = props;

  return (
    showModal &&
    h(
      "div",
      { class: "modal" },
      h(
        "div",
        { class: "modal__dialog" },
        h("div", { class: "modal__content" }, [
          h("h1", { class: "modal__title" }, "Project detail"),
          Form(formData),
          h(
            "button",
            { class: "modal__action__close", onclick: hideModal },
            "Close"
          ),
        ])
      )
    )
  );
};

const Main = (props) => {
  return h("main", { class: "main" }, ProjectList(props));
};

const Footer = (props) => {
  return h("footer", { class: "footer" }, h("p", null, "Developed by KOOGIO"));
};

const View = (state) =>
  h("div", { class: "container" }, [
    Header(state),
    h("div", { class: "flex-container" }, [Main(state)], Modal(state)),
    Footer(state),
  ]);

export default View;
