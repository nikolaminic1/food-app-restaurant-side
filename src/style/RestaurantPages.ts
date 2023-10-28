import styled from "styled-components";

export const MainRestaurantDiv = styled.div`
  width: 100%;
`;

export const MainRestaurantCardDiv = styled.div`
  height: 150px;
  a {
    text-decoration: none;
    color: black;
    height: 100%;
    .content-wrapper {
      display: flex;
      border-radius: 30px;
      height: 100%;
      overflow: hidden;

      .image {
        width: 30%;
        height: 100%;
        background-color: #fafafa;
      }
      .content {
        width: 70%;
        background-color: #f5f4f5;
        padding: 15px;
        .title {
          .name {
          }
          .description {
            /* font-size: 1.7rem;*/
            line-height: 1.3rem;
            text-overflow: ellipsis;
            /* display: -webkit-box; */
            /*-webkit-line-clamp: 1; number of lines to show */
            /* -webkit-box-orient: vertical; */
            --max-lines: 1;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: var(--max-lines);
          }
        }
      }
    }
  }
`;

export const MainDivRatingIcon = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .icon {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.2rem;
    margin-right: 5px;
  }
  .amount {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    font-style: italic;
  }
`;

export const MainDivRestaurantPage = styled.div``;

export const MainDivProductCategorySection = styled.div`
  margin: 30px 0;
`;
export const MainDivCategoriesList = styled.div``;
export const MainDivCategoryCard = styled.div`
  padding: 10px;
  .content-wrapper {
    padding: 30px 20px;
    border-radius: 20px;
    background-color: #fafafa;

    .content {
      display: flex;
      .info {
        width: 50%;
        p {
          margin: 0;
        }
      }

      .data {
        width: 30%;
        p {
          margin: 0;
        }
      }
      .control {
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
          text-decoration: none;
          color: black;
        }
      }
    }
  }
`;

export const MainDivCategoryDetail = styled.div``;
export const MainDivProductCard = styled.div`
  padding: 20px;
  .content-wrapper {
    display: flex;
    height: 140px;
    border-radius: 30px;
    background-color: #fafafa;
    overflow: hidden;
    .image {
      width: 30%;
    }
    .info {
      padding: 10px;
    }
  }
`;
