import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Grid,
  DialogActions,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { Add, Delete } from "@mui/icons-material";
import Chart from "react-apexcharts";
import FormTextField from "../fields/FormTextField";
import { validationBarChartSchema } from "../../validationSchema/validationSchema";


interface CreateBarChartDto {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  xAxisColor: string;
  yAxisColor: string;
  categories: string;
  series: { name: string; data: string; color: string }[];
}

const CreateBarChart = ({ open, onClose }: CreateBarChartDto) => {
  const initialValues: FormValues = {
    title: "",
    xAxisTitle: "",
    yAxisTitle: "",
    xAxisColor: "#000000",
    yAxisColor: "#000000",
    categories: "",
    series: [],
  };

  const handleSubmit = (values: FormValues) => {
    console.log("Formatted values", values);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Create Bar Chart</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationBarChartSchema}>
          {({ values, handleChange }) => {
            const chartData = {
              options: {
                chart: { id: "bar-chart" },
                xaxis: { categories: values.categories.split(",").map((num) => num.trim()), title: { text: values.xAxisTitle, style: { color: values.xAxisColor } } },
                yaxis: { title: { text: values.yAxisTitle, style: { color: values.yAxisColor } } },
              },
              series: values.series.map((serie) => ({ name: serie.name, data: serie.data.split(",").map((num) => Number(num.trim())), color: serie.color })),
            };

            return (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Form>
                    <FormTextField name="title" label="Chart Title" />
                    <FormTextField name="xAxisTitle" label="X-Axis Title" />
                    <FormTextField name="yAxisTitle" label="Y-Axis Title" />
                    <FormTextField name="categories" label="Enter categories (comma-separated)" />

                    <Typography variant="h6" mt={2}>Series</Typography>
                    <FieldArray name="series">
                      {({ push, remove }) => (
                        <Box>
                          {values.series.map((serie, sIndex) => (
                            <Box key={sIndex} p={2} border={1} borderRadius={1} mb={2}>
                              <FormTextField name={`series.${sIndex}.name`} label="Series Name" />
                              <FormTextField name={`series.${sIndex}.data`} label="Enter data (comma-separated)" />
                              <FormTextField name={`series.${sIndex}.color`} label="Series Color" type="color" />
                              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => remove(sIndex)} fullWidth sx={{ mt: 1 }}>
                                Remove Series
                              </Button>
                            </Box>
                          ))}
                          <Button startIcon={<Add />} onClick={() => push({ name: "", data: "", color: "#000000" })} variant="contained" fullWidth>
                            Add Series
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                    {/* <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                      Save
                    </Button> */}
                  </Form>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
                </Grid>
              </Grid>
            );
          }}
        </Formik>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
  
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBarChart;
