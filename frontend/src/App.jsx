import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage.jsx";
import ApartmentDetail from "./pages/ApartmentDetail.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import PrivatePage from "./middlewares/PrivatePage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import SendReview from "./pages/SendReview.jsx";
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import ApartmentEdit from "./pages/ApartmentEdit.jsx";
import ApartmentsIndex from "./pages/ApartmentsIndex.jsx";
import ApartmentCreate from "./pages/ApartmentCreate.jsx";
import ImagesIndex from "./pages/ImagesIndex.jsx";
import ImagesCreate from "./pages/ImagesCreate.jsx";
import MessagesIndex from "./pages/MessagesIndex.jsx";
import ReviewsIndex from "./pages/ReviewsIndex.jsx";

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ScrollToTop>

          <Routes>

            {/* Rotte pubbliche */}
            {/* 404 */}
            <Route path="*" element={<NotFound />} />

            {/* Rotta login */}
            <Route path="login" element={<Login />} />

            {/* Default Layout */}
            <Route path="/" element={<DefaultLayout />}>

              {/* HomePage */}
              <Route index element={<HomePage />} />

              {/* Appartamenti */}
              <Route path="apartments/:slug" element={<ApartmentDetail />} />

              {/* Contattaci */}
              <Route path="/contact-us" element={<ContactUs />} />

              {/* Invia Recensioni */}
              <Route path="/send-review" element={<SendReview />} />

            </Route>

            {/* Rotte private */}
            <Route path="/dashboard" element={
              <PrivatePage>
                <DashboardLayout />
              </PrivatePage>
            }>

              {/* Appartamenti Dashboard */}
              <Route path="apartments">
                {/* Index */}
                <Route index element={<ApartmentsIndex />} />

                <Route path=":slug" >
                  {/* Edit */}
                  <Route path="edit" element={<ApartmentEdit />} />
                </Route>

                {/* Crea */}
                <Route path="create" element={<ApartmentCreate />} />
              </Route>

              {/* Messaggi */}
              <Route path="messages">
                {/* Index */}
                <Route index element={<MessagesIndex />} />
              </Route>

              {/* Recensioni */}
              <Route path="reviews">
                {/* Index */}
                <Route index element={<ReviewsIndex />} />
              </Route>

              {/* Galleria */}
              <Route path="images">
                {/* Index */}
                <Route index element={<ImagesIndex />} />

                {/* Crea */}
                <Route path="create" element={<ImagesCreate />} />
              </Route>

            </Route>

          </Routes>

        </ScrollToTop>
      </AuthProvider >
    </GlobalProvider >
  );
}

export default App;
