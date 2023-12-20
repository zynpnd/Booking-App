//bir arama bağlamını yönetmek için kullanılan

import { createContext, useReducer } from "react";

//Arama bağlamının başlangıç durumunu tanımlayan bir nesnedir.
const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
      adult: undefined,
      children: undefined,
      room: undefined,
    },
  };

  // React uygulamasındaki tüm bileşenler arasında durumu paylaşmak için kullanılan bir context nesnesidir.
  export const SearchContext = createContext(INITIAL_STATE)

  // Context içindeki durumu güncellemek için kullanılan bir "reducer" fonksiyonudur. Bu fonksiyon, farklı eylem türlerine göre durumu günceller.
  // Örneğin, "NEW_SEARCH" eylemi yeni bir arama yapılması durumunda çağrılır ve durumu günceller. "RESET_SEARCH" eylemi ise arama durumunu sıfırlar.
  const SearchReducer = (state, action) => {
    switch (action.type) {
      case "NEW_SEARCH":
        return action.payload;
      case "RESET_SEARCH":
        return INITIAL_STATE;
      default:
        return state;
    }
  };

// SearchContext içindeki durumu sağlar ve güncellemek için useReducer hook'unu kullanır. 
// Bu bileşen, uygulamanızın diğer bileşenlerine, durumu ve durumu güncellemek için kullanılan dispatch fonksiyonunu sağlayarak, arama bağlamını sağlar.
  export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  
    return (
      <SearchContext.Provider
        value={{
          city: state.city,
          dates: state.dates,
          options: state.options,
          dispatch,
        }}
      >
        {children}
      </SearchContext.Provider>
    );
  };

  // Kısacası, arama işlemleri için bir konteyner oluşturur. 
  // SearchContextProvider bileşeni, arama durumunu yönetir ve SearchContext içinde paylaşır, bu da uygulamanızın farklı kısımlarında bu arama durumuna erişim sağlar.
  // Bu şekilde, arama durumu tek bir merkezi yerden yönetilebilir ve güncellenebilir.