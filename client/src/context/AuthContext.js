//kullanıcı kimlik doğrulama ve oturum yönetimini yönetmek için kullanılan
import { createContext, useEffect, useReducer } from "react";

//Kimlik doğrulama bağlamının başlangıç durumunu tanımlayan bir nesnedir. 
//Başlangıçta, kullanıcı (user), yükleme durumu (loading) ve hata durumu (error) bilgilerini içerir. 
//Kullanıcı bilgisi, tarayıcıdaki yerel depolamadan alınır (localStorage.getItem("user")) ve varsa kullanılır.
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// React uygulamasındaki tüm bileşenler arasında kimlik doğrulama durumunu paylaşmak için kullanılan bir context nesnesidir. 
// createContext fonksiyonu ile oluşturulur ve başlangıç durumu (INITIAL_STATE) ile başlatılır.
export const AuthContext = createContext(INITIAL_STATE);

//Context içindeki durumu güncellemek için kullanılan bir "reducer" fonksiyonudur. 
//Bu fonksiyon, farklı eylem türlerine göre durumu günceller.
// Örneğin, "LOGIN_START" eylemi kullanıcının giriş işlemine başladığında çağrılır ve durumu günceller.
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

//AuthContext içindeki durumu sağlar ve güncellemek için useReducer hook'unu kullanır. 
//Ayrıca, kullanıcı bilgisini tarayıcıdaki yerel depolama üzerinden izler ve kullanıcı bilgisi değiştiğinde bu bilgiyi günceller.
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //React öğesi hayata geçtiğinde ve state.user değiştiğinde tetiklenen bir useEffect hook'u. 
  //Kullanıcı bilgisi değiştiğinde, bu bilgiyi tarayıcıdaki yerel depolama üzerine yazarak kullanıcının oturum durumunu takip eder.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Sonuç olarak, bu kod, kullanıcı oturum yönetimini ve kimlik doğrulama durumunu yönetmek için bir altyapı sağlar. 
//AuthContextProvider bileşeni, uygulamanızın diğer bileşenlerine, kimlik doğrulama durumu ve
// durumu güncellemek için kullanılan dispatch fonksiyonunu sağlayarak, bu kimlik doğrulama durumunu paylaşır.