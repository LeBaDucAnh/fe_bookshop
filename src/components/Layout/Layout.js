import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
// import Typography from "../../pages/typography";
// import Notifications from "../../pages/notifications";
// import Maps from "../../pages/maps";
// import Tables from "../../pages/tables";
// import Icons from "../../pages/icons";
// import Charts from "../../pages/charts";
import Books from "../../pages/books/Books";
import Reviews from "../../pages/review/Review";
import Users from "../User/User"; 

import AddBook from "../../pages/books/Add_book";
import AddNewBook from "../../pages/books/Add_new";
import DetailBook from "../../pages/books/Detail_book";
import UpdateBook from "../../pages/books/Update_book";
import Order from "../../pages/order/Orders";
import OrderDetail from "../../pages/order/Detail_order";

import Authors from "../../pages/authors/Authors";
import AddAuthor from "../../pages/authors/Add_author";
import UpdateAuthor from "../../pages/authors/Update_author";
import Report from "../../pages/dashboard/export_excel";
import Categories from "../../pages/category/Categories";
// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/books" component={Books}/>
              <Route path="/app/authors" component={Authors}/>
              <Route path="/app/order" component={Order}/>
              <Route path="/app/category" component={Categories}/>
              <Route path="/app/review" component={Reviews}/>
              <Route path="/app/user" component={Users}/>
              <Route path="/app/book/addbook" component={AddNewBook} />
              <Route path="/app/book/updatebook/:id" component={UpdateBook} />
              <Route path="/app/book/detailbook/:id" component={DetailBook}/>
              <Route path="/app/order/orderdetail/:id" component={OrderDetail}/>
              <Route path="/app/report/" component={Report}/>
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                <Link
                  color={'primary'}
                  href={''}
                  target={'_blank'}
                  className={classes.link}
                >
                  DUCANH
                </Link>
                <Link
                  color={'primary'}
                  href={''}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href={""}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div>
              <div>
                <Link
                  href={''}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={''}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={''}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
