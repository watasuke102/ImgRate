/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const {
  createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {};

module.exports = withVanillaExtract(nextConfig);
