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
    setSearchParams((searchParams) => {
      searchParams.set("page", `${page}`);
      return searchParams;
    });
    applyFilters();
  };
  const pageSizeChange = (current: number, size: number) => {
    setFilters({ ...filters, per_page: size });
    setSearchParams((searchParams) => {
      searchParams.set("per_page", `${size}`);
      return searchParams;
    });
    applyFilters();
  };
  const onChangeSwitch = (value: boolean) => {
    setFilters({ ...filters, visible: Number(value) });
    setSearchParams((searchParams) => {
      searchParams.set("visible", `${Number(value)}`);
      return searchParams;
    });
    applyFilters();
  };
  const onChangeOrder = (value: number) => {
    setFilters({ ...filters, order: value });
    setSearchParams((searchParams) => {
      searchParams.set("order", `${value}`);
      return searchParams;
    });
    applyFilters();
  };

  useEffect(() => {
    if (run.current === false) {
      getProducts();
    }
    return () => {
      run.current = true;
    };
  }, []);

  // useEffect(() => {
  //   getProducts();
  // }, [location, searchParams]);

  const getProducts = () => {
    const page = Number(searchParams.get("page")) - 1;
    const per_page = Number(searchParams.get("per_page"));
    const order = Number(searchParams.get("order"));
    const visible = Number(searchParams.get("visible"));
    setFilters({
      ...filters,
      page: page,
      per_page: per_page,
      order: order,
      visible: visible,
    });

    dispatch(
      getProductsList({
        page: page,
        per_page: per_page == 0 ? 1 : per_page,
        order: order == 0 ? 1 : order,
        visible: visible,
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
  };

  const applyFilters = () => {
    const page = Number(searchParams.get("page")) - 1;
    const per_page = Number(searchParams.get("per_page"));
    const order = Number(searchParams.get("order"));
    const visible = Number(searchParams.get("visible"));

    dispatch(
      getProductsList({
        page: page,
        per_page: per_page,
        order: order,
        visible: visible,
      })
    )
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        {/* <div className="button ms-4">
          <Button onClick={applyFilters}>Apply filters</Button>
        </div> */}
      </div>
      <div className="products mt-3">
        <div className="row gx-1 gy-1">
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
          key={Number(filters)}
          defaultCurrent={filters.page}
          total={products.count}
          onChange={paginationChange}
          onShowSizeChange={pageSizeChange}
          // defaultPageSize={filters.per_page}
          pageSize={filters.per_page}
          showSizeChanger={true}
        />
      </div>
    </MainDivProductsList>
  );
};

export default ProductsList;
