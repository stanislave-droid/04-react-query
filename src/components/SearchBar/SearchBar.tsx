import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";

interface SearchBarProps {
  onSubmit: (input: string) => void;
}

interface FormValues {
  query: string;
}

const initialValues: FormValues = {
  query: "",
};

const validationSchema = Yup.object({
  query: Yup.string().required("Please enter your search query."),
});

export default function SearchBar(props: SearchBarProps) {
  const handleSubmit = (
    { query }: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    if (query.trim().length === 0) {
      toast.error("Please enter your search query.");
      return;
    }

    props.onSubmit(query.trim());
    actions.resetForm();
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <Field
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
