import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

// ($env:CI = "true") -and (npm test)
describe("Blogs view", () => {
  let component;
  
  const mockHandler = jest.fn()
  const blog = {
    title: "first blog",
    author: "henkka",
    url: "https://www.google.fi/",
    likes: 1,
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} testFunc={mockHandler} toggleVisibility={mockHandler}/>);
  });

  test("at start the urls and likes are not displayed", () => {
    const div = component.container.querySelector(".testing2");
    expect(div).toHaveStyle("display: none");
  });

  test("renders only title and author", () => {
    expect(component.container).toHaveTextContent("first blog");
    expect(component.container).toHaveTextContent("henkka");
  });

  test('url and likes are showing when view button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector(".testing2");
    expect(div).not.toHaveStyle('display: none')
    
  })

  test('clicking the like button twice then it calls event handler twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
 
});
