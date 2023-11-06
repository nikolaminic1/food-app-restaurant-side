import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ProductListFilter, getProductsList } from "../../app/service/product";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { MainDivProductsList } from "../../style/products";
import { App, Button, Pagination, Select, Switch } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { Status } from "../../app/service/Status";
import CSpin from "../../layout/CSpin";
import ProductDetailCard from "../../components/ProductDetailCard";

interface Props {}

const ProductsList: FC<Props> = ({}): ReactElement => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [filters, setFilters] = useState<ProductListFilter>({
    page: 1,
    per_page: 20,
    order: 1,
    visible: 1,
  });

  const products = useAppSelector((state: RootState) => {
    return state.product.productsList;
  });

  const run = useRef(false);
  const { notification } = App.useApp();

  const paginationChange = (page: number, pageSize: number) => {
    setFilters({ ...filters, page: page });
    setSearchParams({ page: `${page}` });
    applyFilters();
  };
  const pageSizeChange = (current: number, size: number) => {
    setFilters({ ...filters, per_page: size });
    setSearchParams({ per_page: `${size}` });
    applyFilters();
  };
  const onChangeSwitch = (value: boolean) => {
    setFilters({ ...filters, visible: Number(value) });
  };
  const onChangeOrder = (value: number) => {
    setFilters({ ...filters, order: value });
  };

  useEffect(() => {
    if (run.current === false) {
      const per_page = Number(searchParams.get("order"));
      const order = Number(searchParams.get("order"));
      dispatch(
        getProductsList({
          page: Number(searchParams.get("page")),
          per_page: per_page == 0 ? 1 : per_page,
          order: order == 0 ? 1 : order,
          visible: Number(searchParams.get("visible")),
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          notification.success({
            message: "Products loaded",
            description: "Successfully loaded products list",
          });
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            message: error.name,
          });
        });
    }
    return () => {
      run.current = true;
    };
  }, []);

  const applyFilters = () => {
    dispatch(getProductsList(filters))
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(products.products);

  return (
    <MainDivProductsList>
      <div className="header d-flex justify-content-between">
        <div className="title">
          <h3>Products</h3>
        </div>
        <div className="new-product">
          <Link to={"/products/new"}>
            <Button icon={<AiOutlinePlus />} type="primary">
              New product
            </Button>
          </Link>
        </div>
      </div>
      <div className="filters mt-3 d-flex justify-content-end">
        <div className="filter-item me-5 d-flex align-content-center align-items-center">
          <Switch
            onChange={onChangeSwitch}
            checkedChildren="Visible"
            unCheckedChildren="All"
          />
        </div>
        <div className="filter-item">
          <Select
            style={{ width: "250px" }}
            options={[
              { value: 1, label: "Price ascending" },
              { value: 2, label: "Price descending" },
              { value: 3, label: "Date updated" },
              { value: 4, label: "Date created" },
            ]}
            onChange={onChangeOrder}
            placeholder="Order"
          />
        </div>
        <div className="button ms-4">
          <Button onChange={applyFilters}>Apply filters</Button>
        </div>
      </div>
      <div className="products mt-3">
        <div className="row">
          {products.status == Status.LOADING ? (
            <CSpin />
          ) : (
            <>
              {products?.products?.map((product, i) => {
                return (
                  <div className="col-lg-6 col-12" key={i}>
                    <ProductDetailCard product={product} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="pagination mt-5 justify-content-center">
        <Pagination
          defaultCurrent={filters.page}
          total={products.count}
          onChange={paginationChange}
          onShowSizeChange={pageSizeChange}
          defaultPageSize={20}
          showSizeChanger={true}
        />
      </div>
    </MainDivProductsList>
  );
};

export default ProductsList;
