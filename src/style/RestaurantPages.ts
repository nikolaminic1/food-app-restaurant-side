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
