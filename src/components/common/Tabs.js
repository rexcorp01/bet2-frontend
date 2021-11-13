import { useState } from "react";
import withStyles from '@mui/styles/withStyles';
import { Box, Tabs, Tab } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#000 !important",
    fontWeight: 600,
    fontSize: 16,
    fontWeight: "normal",
    maxWidth: "none"
  }
}))((props) => (
  <Tab
    disableRipple
    component="a"
    onClick={(event) => {
      event.preventDefault();
    }}
    {...props}
  />
));

const StyledTabs = withStyles({
  root: {
    display: "flex",
    // marginBottom: "40px",
    borderBottom: "1px solid #EAEEF8",
    minWidth: 72,
  },
  indicator: {
    backgroundColor: "#0073F4"
  }
})((props) => (
  <Tabs
    variant="scrollable"
    scrollButtons="auto"
    {...props}
  />
));

export default function BaseTabs(props) {
  const { tabs, panels } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <StyledTabs value={value} onChange={handleChange}>
        {tabs.map((item, i) => (
          <StyledTab
            key={i}
            label={item.label}
            {...a11yProps(i)}
          />
        ))}
      </StyledTabs>
      {panels.map((panel, k) => (
        <TabPanel value={value} index={k} key={k}>
          {panel}
        </TabPanel>
      ))}
    </Box>
  );
}
