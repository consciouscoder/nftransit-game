import { useEffect, useState } from "react";
import "./App.css";
import {
  Header,
  Button,
  Container,
  Image,
  Modal,
  Grid,
  Input,
} from "semantic-ui-react";
import { ScatterBoxLoader } from "react-awesome-loaders";
import { gameItems } from "./items.js";

function App() {
  const [cards, setCards] = useState(null);
  const [open, setOpen] = useState(false);
  const [showTransfer, setTransfer] = useState(false);
  const [item, setItem] = useState(null);
  const [loading, setLoader] = useState(false);
  const [loadingBringBack, setLoadingBringBack] = useState(false);
  const [counter, setCounter] = useState(false);

  // shuffle cards, duplicate cards to get set of 12, assign random ID to each
  const shuffleCards = () => {
    let counter = 0;
    const shuffledCards = [...gameItems] // 2 lots of card images
      .sort(() => Math.random() - 0.5) // shuffled array
      .map((card) => ({ ...card, id: counter++ })); // add on random ID number to each card
    console.log(shuffledCards);
    setCounter(counter);
    setCards(shuffledCards);
  };

  const transferItemPress = (item) => {
    setTransfer(true);
  };

  // =====================================
  const mintItemPress = (item, mintaddress) => {
    // THIS IS THE MINT ACTION

    setOpen(false);
    setLoader(true);

    const timeId = setTimeout(() => {
      setLoader(false);
    }, 10000);

    // CALL MINT API
    console.log(item);
    console.log(`MINT API HERE!`);
  };

  const bringBackItemPress = (txhash, signature) => {
    // THIS IS THE BRINGBACK ACTION

    setTransfer(false);
    setLoadingBringBack(true);

    const timeId = setTimeout(() => {
      setLoadingBringBack(false);
    }, 10000);
  };
  // =====================================

  const ItemGrid = () => {
    return (
      <Grid centered={true}>
        <Grid.Row columns={4}>
          <Grid.Column>
            <Image
              className="item"
              src={cards[0].src}
              onClick={() => showModal(cards[0])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[1].src}
              onClick={() => showModal(cards[1])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[2].src}
              onClick={() => showModal(cards[2])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[3].src}
              onClick={() => showModal(cards[3])}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={4}>
          <Grid.Column>
            <Image
              className="item"
              src={cards[4].src}
              onClick={() => showModal(cards[4])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[5].src}
              onClick={() => showModal(cards[5])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[6].src}
              onClick={() => showModal(cards[6])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[7].src}
              onClick={() => showModal(cards[7])}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  const LoadingMintModal = () => {
    return (
      <Modal
        size="small"
        open={loading}
        style={{
          border: "15px solid",
          color: "midnightblue",
          borderRadius: "20px",
        }}
      >
        <Header
          size="huge"
          style={{
            backgroundColor: "#000000",
            color: "white",
          }}
        >
          MINTING...
        </Header>
        <Modal.Content
          style={{
            backgroundColor: "#000000",
            color: "white",
          }}
        >
          <div
            style={{
              paddingLeft: "115px",
              marginLeft: "115px",
              paddingBottom: "50px",
            }}
          >
            <ScatterBoxLoader primaryColor={"lime"} background={"#000000"} />
          </div>
        </Modal.Content>
      </Modal>
    );
  };

  const LoadingBringBackModal = () => {
    return (
      <Modal
        size="small"
        open={loadingBringBack}
        style={{
          border: "15px solid",
          color: "midnightblue",
          borderRadius: "20px",
        }}
      >
        <Header
          size="huge"
          style={{
            backgroundColor: "#000000",
            color: "white",
          }}
        >
          RETRIEVING ITEM...
        </Header>
        <Modal.Content
          style={{
            backgroundColor: "#000000",
            color: "white",
          }}
        >
          <div
            style={{
              paddingLeft: "115px",
              marginLeft: "115px",
              paddingBottom: "50px",
            }}
          >
            <ScatterBoxLoader primaryColor={"lime"} background={"#000000"} />
          </div>
        </Modal.Content>
      </Modal>
    );
  };

  const ItemModal = ({ item }) => {
    console.log(item);
    return (
      <div>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          style={{
            border: "15px solid",
            color: "midnightblue",
            borderRadius: "20px",
          }}
        >
          <Header
            size="large"
            style={{
              backgroundColor: "#000000",
              color: "white",
            }}
          >
            Mint into NFT?
          </Header>
          <Modal.Content image style={{ backgroundColor: "#000" }}>
            <Image size="medium" src={item?.src} wrapped />
            <Modal.Description style={{ width: "100%" }}>
              <Header size="large" style={{ color: "yellow" }}>
                {item.name}
              </Header>
              <p style={{ color: "red" }}>LEVEL: {item.level}</p>
              <p style={{ color: "forestgreen" }}>{item.stats}</p>
              <p style={{ color: "white" }}>{item.description}</p>
              <Input
                size="large"
                placeholder="ETH Address"
                style={{
                  width: "100%",
                  paddingTop: "150px",
                  backgroundColor: "black !important",
                  color: "lime !important",
                }}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions style={{ backgroundColor: "#000" }}>
            <Button
              color="black"
              inverted="true"
              size="huge"
              onClick={() => setOpen(false)}
            >
              Nope
            </Button>
            <Button
              content="MINT!"
              onClick={() => mintItemPress(item)}
              size="huge"
              inverted="true"
              color="green"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  };

  const TransferModal = () => {
    return (
      <div>
        <Modal
          size="small"
          onClose={() => setTransfer(false)}
          onOpen={() => setTransfer(true)}
          open={showTransfer}
          style={{
            border: "15px solid",
            color: "midnightblue",
            borderRadius: "20px",
          }}
        >
          <Header
            size="large"
            style={{
              backgroundColor: "#000000",
              color: "white",
            }}
          >
            Bring Item Back
          </Header>
          <Modal.Content image style={{ backgroundColor: "#000" }}>
            <Modal.Description style={{ width: "100%" }}>
              <Input
                size="large"
                placeholder="Tx Hash"
                style={{
                  width: "100%",
                  backgroundColor: "black !important",
                  color: "lime !important",
                }}
              />
              <Input
                size="large"
                placeholder="Signature"
                style={{
                  width: "100%",
                  paddingTop: "20px",
                  backgroundColor: "black !important",
                  color: "lime !important",
                }}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions style={{ backgroundColor: "#000" }}>
            <Button
              color="black"
              inverted="true"
              size="huge"
              onClick={() => setTransfer(false)}
            >
              Nope
            </Button>
            <Button
              content="TRANSFER!"
              onClick={() => bringBackItemPress(true)}
              size="huge"
              inverted="true"
              color="green"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  };

  const showModal = (card) => {
    setItem(card);
    setOpen(true);
    //console.log(card);
  };

  // Shuffle items
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <Container className="center">
      <div>
        <Button
          inverted="true"
          color="green"
          size="huge"
          onClick={() => transferItemPress(item)}
          className="transfer-button"
        >
          TRANSFER NFT
        </Button>
        <Header
          as="h1"
          attached="top"
          style={{
            marginBottom: "40px",
            width: "100%",
            color: "white",
            backgroundColor: "black",
            border: "0px",
            borderRadius: "25px",
          }}
        >
          Your Inventory
        </Header>
        {cards ? <ItemGrid /> : null}
        {item ? <ItemModal item={item} /> : null}
        <LoadingMintModal />
        <TransferModal />
        <LoadingBringBackModal />
      </div>
    </Container>
  );
}

export default App;
