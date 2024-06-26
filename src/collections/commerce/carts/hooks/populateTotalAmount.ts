import type { Cart } from 'payload/generated-types'
import type { FieldHook } from 'payload/types'

export const populateTotalAmount: FieldHook<Cart> = async () => {
  // const products = await Promise.all(
  //   data.lines.map(line => {
  //     return typeof line.product === 'object'
  //       ? line.product
  //       : payload.findByID({
  //           collection: 'products',
  //           id: line.product,
  //         })
  //   }),
  // )

  // const value = 0;
  // data.lines.forEach((line) => {
  //   const product =
  //     typeof line.product === "object"
  //       ? line.product
  //       : products.find((product) => product.id === line.product);
  //   const variant = product.variants.find(
  //     (variant) => variant.id === line.variant
  //   );
  //   console.log(variant);
  // });

  // console.log(products);

  return 0
}
