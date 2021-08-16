import { childrenShape } from '../shapes/shapes';
import Navigation from './Navigation';

const Layout = ({ children }) => (
  <>
    <Navigation />
    <main>{children}</main>
  </>
);

Layout.propTypes = {
  children: childrenShape.isRequired,
};

export default Layout;
