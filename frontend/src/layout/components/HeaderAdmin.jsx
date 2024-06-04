import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";
const HeaderStyled = styled.header`
  display: flex;
  position: fixed;
  z-index: 1000;
  top: 0;
  width: -webkit-fill-available;
  height: 78px;
  padding: 18px 0;
  padding-right: 18px;
  justify-content: space-between;
  align-items: center;
  color: white;

  & .result-search {
    & li,
    & li > div {
      border-radius: 4px;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  @media (max-width: 46.1875em) {
    left: 0;
    right: 0;
    height: 62px;
    padding: 15px 20px;
    & .header__wrap {
      gap: 20px;
    }
    & .wrap-input {
      flex: 1;
    }
  }
`;

const HeaderAdmin = () => {
  const name = useSelector(
    (state) => state?.auth?.login?.currentUser?.data?.username
  );
  return (
    <HeaderStyled className="bg-darkColors1">
      <div className="flex items-center justify-end w-full header__wrap">
        <Info name={name}></Info>
      </div>
    </HeaderStyled>
  );
};

export default HeaderAdmin;

function Info({ name = "user" }) {
  return (
    <div className="bg-darkColors2 items-center rounded-[10px] px-[20px] py-[10px] gap-[20px] text-white md:flex hidden">
      <div className="text-displayBold font-medium capitalize">{name}</div>
    </div>
  );
}

Info.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
};
