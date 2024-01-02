import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertiesPage from "../pages/PropertiesPage/PropertiesPage";
import BookingsPage from "../pages/BookingsPage/BookingsPage";
import PropertyDetailsPage from "../pages/PropertyDetailsPage/PropertyDetailsPage";
import BookingDetailsPage from "../pages/BookingDetailsPage/BookingDetailsPage";
import Header from "../components/Header";
import styled from "styled-components";
import { colors } from "../styles/theme";

const AppContainer = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  margin: 0 auto;
  background-color: ${colors.background};
  min-height: 100vh;
`;

function AppRoutes() {
  return (
    <Router basename="/bookfully">
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookings/:id" element={<BookingDetailsPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default AppRoutes;
