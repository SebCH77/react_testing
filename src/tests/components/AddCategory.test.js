import { shallow } from "enzyme";
import React from "react";
import { AddCategory } from "../../components/AddCategory";
import "@testing-library/jest-dom";

describe("Pruebas en <AddCategory/>", () => {
  //   const setCategories = () => {};
  const setCategories = jest.fn(); //OJO
  let wrapper = shallow(<AddCategory setCategories={setCategories} />);

  beforeEach(() => {
    jest.clearAllMocks(); //OJO
    wrapper = shallow(<AddCategory setCategories={setCategories} />);
  });

  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de cambiar la caja de texto", () => {
    const input = wrapper.find("input");
    const texto = "Hola mundo";
    input.simulate("change", { target: { value: texto } });

    expect(wrapper.find("p").text().trim()).toBe(texto);
  });

  test("NO debe de postear la información con submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} }); //OJO

    expect(setCategories).not.toHaveBeenCalled(); //OJO
  });
  test("debe de llamar el setCategories y limpiar la caja de texto", () => {
    const value = "Hola Mundo";

    // 1. simular el inputChange
    wrapper.find("input").simulate("change", { target: { value } });

    // 2. simular el submit
    wrapper.find("form").simulate("submit", { preventDefault() {} });

    // 3. setCategories se debe de haber llamado
    expect(setCategories).toHaveBeenCalled();
    expect(setCategories).toHaveBeenCalledTimes(1);
    expect(setCategories).toHaveBeenCalledWith(expect.any(Function));

    // 4. el valor del input debe de estar ''
    expect(wrapper.find("input").prop("value")).toBe("");
  });
});
