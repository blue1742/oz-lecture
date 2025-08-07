const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 500;
  transition: var(--transition);
  position: relative;

  &:hover {
    color: var(--primary-color);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const AuthButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: var(--gradient);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
`;

const UserName = styled.span`
  font-weight: 500;
  color: var(--text-dark);
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-dark);

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    
    ul {
      list-style: none;
      padding: 0;
      
      li {
        padding: 0.5rem 0;
        
        a {
          text-decoration: none;
          color: var(--text-dark);
          font-weight: 500;
        }
      }
    }
  }
`;

function Navbar({ user }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <Nav scrolled={scrolled}>
        <NavContainer>
          <Logo to="/">Malrang</Logo>
          
          <NavLinks>
            <li><NavLink to="/">홈</NavLink></li>
            <li><NavLink to="/#features">기능</NavLink></li>
            <li><NavLink to="/#subscription">정기후원</NavLink></li>
            <li><NavLink to="/#contact">연락처</NavLink></li>
            
            {user ? (
              <UserInfo>
                {user.photoURL && <UserAvatar src={user.photoURL} alt={user.displayName} />}
                <UserName>{user.displayName || user.email}</UserName>
                <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
              </UserInfo>
            ) : (
              <AuthButton onClick={handleLogin}>로그인</AuthButton>
            )}
          </NavLinks>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            ☰
          </MobileMenuButton>
        </NavContainer>
      </Nav>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <ul>
          <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>홈</Link></li>
          <li><Link to="/#features" onClick={() => setMobileMenuOpen(false)}>기능</Link></li>
          <li><Link to="/#subscription" onClick={() => setMobileMenuOpen(false)}>정기후원</Link></li>
          <li><Link to="/#contact" onClick={() => setMobileMenuOpen(false)}>연락처</Link></li>
          {user ? (
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          ) : (
            <li>
              <button onClick={handleLogin}>로그인</button>
            </li>
          )}
        </ul>
      </MobileMenu>
    </>
  );
}

export default Navbar;