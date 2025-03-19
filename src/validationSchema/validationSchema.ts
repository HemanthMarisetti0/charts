import * as Yup from "yup";

export const validationBarChartSchema = Yup.object().shape({
  title: Yup.string().required("Chart title is required"),
  xAxisTitle: Yup.string().required("X-axis title is required"),
  yAxisTitle: Yup.string().required("Y-axis title is required"),
  xAxisColor: Yup.string().required("X-axis color is required"),
  yAxisColor: Yup.string().required("Y-axis color is required"),
  categories: Yup.string()
    .required("Required")
    .test("is-valid-array", "Enter valid numbers separated by commas", (value) => {
      if (!value) return false;
      return value.split(",").every((num) => !isNaN(Number(num.trim())));
    }),
  series: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Series name is required"),
        data: Yup.string()
          .required("Required")
          .test("is-valid-array", "Enter valid numbers separated by commas", (value) => {
            if (!value) return false;
            return value.split(",").every((num) => !isNaN(Number(num.trim())));
          }),
        color: Yup.string().required("Color is required"),
      })
    )
    .min(1, "Add at least one series"),
});
