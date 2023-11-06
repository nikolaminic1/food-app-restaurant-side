import React, { FC, ReactElement, useState, useEffect } from "react";
import VariationNew from "./VariationNew";
import VariationCard from "./VariationCard";
import { Product, Variation } from "../app/models/responseModels/restaurants";
import { Button, FormInstance, Input, Modal } from "antd";
import { emptyVariations } from "../app/store/actions/product";
import VariationExisting from "./VariationExisting";

interface Props {
  // variation: Variation;
  form: FormInstance;
  product: Product | undefined;
}

const VariationSection: FC<Props> = ({ form, product }): ReactElement => {
  const [isModalOpenVariationAdd, setIsModalOpenVariationAdd] = useState(false);
  const [newVariation, setNewVariation] = useState(false);
  const [newVariationName, setNewVariationName] = useState("");
  const [doesHaveVariations, setDoesHaveVariations] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    if (product?.variation) {
      setDoesHaveVariations(true);
      console.log("1");
    } else {
      setDoesHaveVariations(false);
      console.log("2");
    }
  }, [product]);

  const handleCancelModalAddVariation = () => {
    setIsModalOpenVariationAdd(false);
  };

  const onChangeVariationName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("Change:", e.target.value);
    setNewVariationName(e.target.value);
  };

  const showModalModalAddVariation = () => {
    setIsModalOpenVariationAdd(true);
  };

  const handleOkModalAddVariation = () => {
    setIsModalOpenVariationAdd(false);
    setDoesHaveVariations(true);
    setNewVariation(true);
    form.setFieldValue("variation", newVariationName);
  };

  const deleteVariation = () => {
    setDoesHaveVariations(false);
    setNewVariation(true);
    emptyVariations();
    form.setFieldValue("product_variations", []);
    form.setFieldValue("new_product_variations", []);
    form.setFieldValue("variation", "");
    form.setFieldValue("variation_id", null);

    // console.log(form.getFieldValue("product_variations"));
  };

  const newV = () => {
    return (
      <div className="new-variation">
        <VariationNew
          newVariation={newVariation}
          deleteVariation={deleteVariation}
          name={newVariationName}
        />
      </div>
    );
  };

  const existingV = () => {
    return (
      <VariationExisting
        deleteVariation={deleteVariation}
        variation={product?.variation}
      />
    );
  };

  return (
    <>
      <h4 className="text-start pt-3 pb-1">Variation</h4>

      {doesHaveVariations ? (
        <>
          <div className="variations text-start">
            <div className="mt-2">
              <Button onClick={deleteVariation} danger>
                Delete variation
              </Button>
            </div>

            {newVariation == true
              ? // there is problem somewhere here, it does not show new variation
                newV()
              : existingV()}
          </div>
        </>
      ) : (
        <>
          <Modal
            title="Add variation by typing name"
            cancelText="Cancel"
            open={isModalOpenVariationAdd}
            onOk={handleOkModalAddVariation}
            onCancel={handleCancelModalAddVariation}
          >
            <h3>Variation name</h3>
            <Input onChange={onChangeVariationName} />
          </Modal>
          <Button onClick={showModalModalAddVariation} size="middle">
            Add variation
          </Button>
        </>
      )}
    </>
  );
};

export default VariationSection;
