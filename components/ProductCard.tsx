import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
};

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
  badge,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <Link href={`/product/${id}`} className="product-image-wrap">
        {badge && <span className="product-badge">{badge}</span>}

        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-image"
        />

        <span className="product-quick-add">
          VIEW PRODUCT →
        </span>
      </Link>

      <div className="product-info">
        <p className="product-category">{category}</p>

        <div className="product-info-row">
          <h3>{name}</h3>

          <strong>
            ₹{price.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>
    </article>
  );
}