
export default function WordChainWinner() {
   const WORDCHAIN_WINNER_DATA={
    "winners": [
      {
        "roomId": 25,
        "winner": {
          "id": 1,
          "profileImage": "https://item.kakaocdn.net/do/cefb8ed496e0541d2a99293a1fa06233616b58f7bf017e58d417ccb3283deeb3",
          "name": "서지수"
        }
      }
    ],
    "hasNext": true
  }

  const rommId=WORDCHAIN_WINNER_DATA.winners[0]?.roomId
  const profileImage=WORDCHAIN_WINNER_DATA.winners[0]?.winner?.profileImage
  const name=WORDCHAIN_WINNER_DATA.winners[0]?.winner?.name

  return (
    <>
    <p>{rommId}</p>
    <img src={profileImage} alt="우승자 이미지"/>
    <p>{name}</p>
    </>
  )
}
