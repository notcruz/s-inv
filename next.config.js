/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com', 'images.stockx.com']
  }
}

let consolewarn = console.warn
console.warn = (...args) => {
  if (args.length > 1 && args[1].startsWith("You should not access 'res' after getServerSideProps")) {
    // ignore message until this is fixed: https://github.com/auth0/nextjs-auth0/issues/524
  } else {
    consolewarn(...args)
  }
}

module.exports = nextConfig