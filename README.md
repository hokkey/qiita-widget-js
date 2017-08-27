# ejsbemplate

フロントエンド開発の効率を上げるテンプレート・frontplateのフォーク版

[本家](https://github.com/frontainer/frontplate/)

## Dependence

* [NodeJS](https://nodejs.org/) 7.4以上
* [frontplate-cli](https://www.npmjs.com/package/frontplate-cli) 3.0以上

## Usage

```
brew update && brew install jq
npm install -g frontplate-cli

frp create testing -g hokkey/ejsbemplate
cd testing
chmod +x ./generate-components.sh
./generate-components.sh

# 開発ビルド
npm run build

# プロダクションビルド
npm run production
```

詳しくは[wiki](https://github.com/frontainer/frontplate-cli/wiki)を参照ください

https://github.com/frontainer/frontplate-cli/wiki
