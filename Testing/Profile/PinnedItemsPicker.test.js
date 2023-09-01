import "@testing-library/jest-dom/extend-expect";
const { render, screen } = require("@testing-library/react");
const { PinneditemsPicker } = require("Components/Profile/PinnedItemsPicker");

test.skip("No items showing up in pinned items picker", () => {
    render(<PinneditemsPicker />);

    const notFoundText = screen.getByText("Nothing to show here");
    //* this should fail, as passing no data will show a <Noitem/> component
    expect(notFoundText).not.toBeInTheDocument();
});

test(" items showing up in pinned items picker", () => {
    render(
        <PinneditemsPicker
            data={{
                pages: [
                    {
                        list: [
                            {
                                malid: 1,
                                title: "This is title -1",
                            },
                            {
                                malid: 2,
                                title: "This is title -2",
                            },
                            {
                                malid: 3,
                                title: "This is title -3",
                            },
                        ],
                    },
                ],
            }}
            pinnedItems={["1", "2", "3"]}
        />
    );


    const notFoundText = screen.queryByText("Nothing to show here");
    expect(notFoundText).not.toBeInTheDocument();
});
