# calculator
関数電卓の作成

##目的
javascriptの勉強のために、関数電卓を作成する。

##主な仕様

###計算能力
*google電卓と同等の機能を目指す  
*計算は全て複素数の範囲で行う  
*四則演算、べき乗、指数関数、対数関数、三角関数、双曲線関数等を実装する  

###インターフェース
*キーボード入力とボタン入力に対応  
*簡単な数式の入力ミスはその場でリアルタイムで指摘  
*計算実行時に数式の入力ミスがあった場合は、当該箇所の文字色を変えエラーメッセージを表示する  

##開発方針
*クライアントサイドjavascriptの勉強のため、処理は全てクライアントサイドjavascriptで行う  
*計算ロジックの部分は全てネイティブjavascriptで記述する  
*Viewとの連携にAngularJSやBootstrapを使用するかは検討中  
