import React, { useState, useEffect } from "react";

import { CircularProgress } from "@material-ui/core";
import Slider from "./components/Slider";

const SliderProps = {
  zoomFactor: 100 /* ホバー時にどれくらいズームするか */,
  slideMargin: 5 /* スライド間の余白 */,
  maxVisibleSlides: 5 /* 1ページあたりのスライド枚数*/,
  pageTransition: 500 /* 次のページへの推移速度 */,
};

interface Picture {
  id: number;
  webformatURL: string;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pictures, setPictures] = useState<Picture[]>([]);

  /* 画像データは Pixabay API 経由で取得（無料で高画質な写真を提供してくれるサービス） */
  const fetchPctures = async () => {
    const baseUrl = "https://pixabay.com/api/";

    const perPage = 20; /* 1ページあたりの取得件数 */
    const key =
      process.env.REACT_APP_PIXABAY_API_KEY || ""; /* Pixabay APIキー */

    const query = new URLSearchParams({
      per_page: perPage.toString(),
      key: key,
    }); /* クエリパラメータを作成 */

    const res = await (await fetch(`${baseUrl}?${query}`)).json();

    setPictures(res.hits);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPctures();
  }, []);

  /* ローディング中はアニメーションを流す */
  if (isLoading) return <CircularProgress />;

  return (
    <Slider {...SliderProps}>
      {pictures.map((picture) => (
        <div key={picture.id}>
          <img src={picture.webformatURL} alt="slide-pict" />
        </div>
      ))}
    </Slider>
  );
};

export default App;
