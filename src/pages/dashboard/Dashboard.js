import React, { useState, useEffect } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
  Legend,
  Bar,
  BarChart,
  Tooltip,
} from "recharts";


// styles
import useStyles from "./styles";
import axios from 'axios';
// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import { BASE_URL } from "../../config";
const mainChartData = getMainChartData();


export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");
  const [orderData, setOrderData] = useState(null);
  const [dailyRevenueData, setDailyRevenueData] = useState([]);
  const [productStatsData, setProductStatsData] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL +'/api/book/product-stats/').then(res => {
      setProductStatsData(res.data);
    })
    .catch(error => {
      console.error('Error fetching order statistics', error);
    });
  }, []);

  useEffect(() => {
    axios.get(BASE_URL + '/api/transaction/daily-revenue/').then(res => {
      setDailyRevenueData(res.data);
    })
    .catch(error => {
      console.error('Error fetching order statistics', error);
    });
  }, []);

  useEffect(() => {
    axios.get(BASE_URL + '/api/transaction/order_statistics/')
      .then(response => {
        setOrderData(response.data);
      })
      .catch(error => {
        console.error('Error fetching order statistics', error);
      });
  }, []);

  console.log('url', BASE_URL + '/api/transaction/order_statistics/');
  console.log('áddd', orderData);

  if (!orderData) {
    return (
      <div>Loading...</div>

    )
  }
  //window.location.reload();
  const COLORS = ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384'];

  const data = [
    { name: 'Chờ xác nhận', value: orderData.values[0] },
    { name: 'Đang giao', value: orderData.values[1] },
    { name: 'Đã giao', value: orderData.values[2] },
    { name: 'Đã hủy', value: orderData.values[3] },
  ];
  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          {/* <Widget
            title="Visits Today"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
                12, 678
              </Typography>
                </Grid>
                <Grid item xs={6}>
              <LineChart
                width={100}
                height={30}
                data={[
                  { value: 10 },
                  { value: 15 },
                  { value: 10 },
                  { value: 17 },
                  { value: 18 },
                ]}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Registrations
                </Typography>
                <Typography size="md">860</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Sign Out
                </Typography>
                <Typography size="md">32</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Rate
                </Typography>
                <Typography size="md">3.25%</Typography>
              </Grid>
            </Grid>
          </Widget> */}
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          {/* <Widget
            title="App Performance"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.performanceLegendWrapper}>
              <div className={classes.legendElement}>
                <Dot color="warning" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Integration
                </Typography>
              </div>
              <div className={classes.legendElement}>
                <Dot color="primary" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  SDK
                </Typography>
              </div>
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Integration
              </Typography>
              <LinearProgress
                variant="determinate"
                value={77}
                classes={{ barColorPrimary: classes.progressBarPrimary }}
                className={classes.progress}
              />
            </div>
            <div>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                SDK
              </Typography>
              <LinearProgress
                variant="determinate"
                value={73}
                classes={{ barColorPrimary: classes.progressBarWarning }}
                className={classes.progress}
              />
            </div>
          </Widget> */}
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          {/* <Widget
            title="Server Overview"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                60% / 37°С / 3.3 Ghz
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.secondary.main}
                      fill={theme.palette.secondary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                54% / 31°С / 3.3 Ghz
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                57% / 21°С / 3.3 Ghz
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.warning.main}
                      fill={theme.palette.warning.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Widget> */}

        </Grid>
        {/* <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Revenue Breakdown" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart> */}
        {/* <Pie
                      data={chartData}
                      // innerRadius={30}
                      // outerRadius={40}
                      // dataKey="value"
                    /> */}
        {/* {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))} */}

        {/* </PieChart>
                </ResponsiveContainer>
              </Grid> */}
        {/* <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {chartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid> */}
        {/* </Grid>
          </Widget>
        </Grid> */}
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Thống kê số lượng sách
                </Typography>
                {/* <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                      Tablet
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Mobile
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="secondary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Desktop
                    </Typography>
                  </div>
                </div> */}
              </div>
            }
          >
              <BarChart width={1700} height={500} data={productStatsData}>
                <XAxis dataKey="name" label={{ value: 'Sách', position: 'insideBottomRight' }}/>
                <YAxis label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="inventory" fill="#8884d8" name="Hàng tồn" />
                <Bar dataKey="sales" fill="#82ca9d" name="Hàng bán được" />
              </BarChart>
          </Widget>
        </Grid>
        {/* {mock.bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))} */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Widget
              title="Thống kê đơn hàng"
              upperTitle
              noBodyPadding
              bodyClass={classes.tableWidget}
            >
              <PieChart width={400} height={300}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {
                    data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Legend />
              </PieChart>
            </Widget>
          </Grid>
          <Grid item xs={8}>
            <Widget
              title="Doanh thu mỗi ngày"
              upperTitle
              noBodyPadding
              bodyClass={classes.tableWidget}
            >
              <BarChart width={600} height={400} data={dailyRevenueData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" />
              </BarChart>
            </Widget>
          </Grid>
          {/* <Grid item xs={8}>
            <Widget
              title="Thống kê sách tồn"
              upperTitle
              noBodyPadding
              bodyClass={classes.tableWidget}
            >
              <BarChart width={600} height={400} data={productStatsData}>
                <XAxis dataKey="name" label={{ value: 'Sách', position: 'insideBottomLeft' }}/>
                <YAxis label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="inventory" fill="#8884d8" name="Hàng tồn" />
                <Bar dataKey="sales" fill="#82ca9d" name="Hàng bán được" />
              </BarChart>
            </Widget>
          </Grid> */}
        </Grid>
      </Grid>

    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
