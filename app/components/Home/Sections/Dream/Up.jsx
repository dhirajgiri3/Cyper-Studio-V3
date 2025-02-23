import { motion } from "framer-motion";
import Image from "next/image";
import React, { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import img1 from "../../../../../public/Assets/Image/Dashboard-Section/dhiraj.png";
import img2 from "../../../../../public/Assets/Image/Dashboard-Section/rajendra.png";
import img3 from "../../../../../public/Assets/Image/Dashboard-Section/bruce.png";
import img4 from "../../../../../public/Assets/Image/Dashboard-Section/johns.png";
import img5 from "../../../../../public/Assets/Image/Dashboard-Section/simon.png";

const generateRandomMovements = () => {
  const movements = [];
  for (let i = 0; i < 4; i++) {
    movements.push({
      x: Math.floor(Math.random() * 300 - 150),
      y: Math.floor(Math.random() * 300 - 150),
      rotation: Math.floor(Math.random() * 10 - 5)
    });
  }
  return movements;
};

const createClientSideMovement = (movements) => `
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(${movements[0].x}px, ${movements[0].y}px) rotate(${movements[0].rotation}deg); }
  50% { transform: translate(${movements[1].x}px, ${movements[1].y}px) rotate(${movements[1].rotation}deg); }
  75% { transform: translate(${movements[2].x}px, ${movements[2].y}px) rotate(${movements[2].rotation}deg); }
`;

const avatarData = [
  {
    id: 1,
    image: img1,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    className: "avatar1",
    row: "row1",
    col: "col5"
  },
  {
    id: 2,
    image: img2,
    avatarUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f",
    className: "avatar2",
    row: "row2",
    col: "col1"
  },
  {
    id: 3,
    image: img3,
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    className: "avatar3",
    row: "row4",
    col: "col3"
  },
  {
    id: 4,
    image: img4,
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    className: "avatar4",
    row: "row5",
    col: "col4"
  },
  {
    id: 5,
    image: img5,
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    className: "avatar5",
    row: "row7",
    col: "col2"
  }
];

const UpContainers = styled(motion.div)`
  width: 100%;
  height: 100%;
  .up {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(8, 1fr);
    gap: 1.5rem;
    grid-auto-flow: row;

    .avatar {
      object-fit: cover;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      transition: transform 0.4s ease-in-out;
      transform-style: preserve-3d;
      backface-visibility: hidden;

      &:hover {
        transform: scale(1.1) rotate(2deg);
      }
    }

    .avatars {
      width: 5rem;
      height: 5rem;
      padding: 0.25rem;
      border-radius: 1000px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(12px);
      border: 2px solid rgba(255, 255, 255, 0.1);
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.15),
        inset 0 2px 4px rgba(255, 255, 255, 0.1);
      transition: all 0.4s ease-in-out;
      position: relative;
      isolation: isolate;

      &::after {
        content: '';
        position: absolute;
        inset: -1px;
        background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.2));
        border-radius: inherit;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
      }

      &:hover::after {
        opacity: 1;
      }

      &:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: 
          0 12px 40px rgba(0, 0, 0, 0.2),
          inset 0 2px 4px rgba(255, 255, 255, 0.2),
          0 0 20px rgba(255, 255, 255, 0.1);
      }

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
      }

      &:hover::before {
        opacity: 1;
      }

      @media screen and (max-width: 767px) {
        width: 4rem;
        height: 4rem;
      }

      @media screen and (max-width: 380px) {
        width: 3rem;
        height: 3rem;
      }
    }

    .avatar1 {
      margin-left: 12rem;
      margin-bottom: 12rem;
    }

    .avatar2 {
      margin-left: 8rem;
      margin-top: 6rem;
    }

    .avatar3 {
      margin-left: 22rem;
      margin-bottom: 8rem;
    }

    .avatar4 {
      margin-top: 8rem;
      margin-left: 18rem;
    }

    .avatar5 {
      margin-left: 16rem;
      margin-top: 3rem;
    }

    .row1 {
      grid-column: 1 / span 6;
      grid-row: 1 / span 2;
    }

    .row2 {
      grid-column: 1 / span 2;
      grid-row: 3 / span 2;
    }

    .row4 {
      grid-column: 4 / span 2;
      grid-row: 3 / span 2;
    }

    .row5 {
      grid-column: 1 / span 3;
      grid-row: 5 / span 2;
    }

    .row7 {
      grid-column: 4 / span 3;
      grid-row: 5 / span 2;
    }

    .row8 {
      grid-column: 1 / span 6;
      grid-row: 7 / span 2;
    }

    .col1, .col2, .col3, .col4, .col5, .col6 {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }

      @media screen and (max-width: 767px) {
        width: 100%;
        height: 100%;
      }

      img {
        max-width: 5rem;
        max-height: 5rem;
        object-fit: cover;
        border-radius: 8px;
      }
    }

    .col1 { animation: ${props => props.isClient ? `col1Movement 30s linear infinite` : 'none'}; }
    .col2 { animation: ${props => props.isClient ? `col2Movement 30s linear infinite` : 'none'}; }
    .col3 { animation: ${props => props.isClient ? `col3Movement 30s linear infinite` : 'none'}; }
    .col4 { animation: ${props => props.isClient ? `col4Movement 30s linear infinite` : 'none'}; }
    .col5 { animation: ${props => props.isClient ? `col5Movement 30s linear infinite` : 'none'}; }

    ${props => props.isClient && props.movements.map((_, index) => `
      @keyframes col${index + 1}Movement {
        ${createClientSideMovement(props.movements[index])}
      }
    `)}
  }
`;

const fadeVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
};

function Up() {
  const [isClient, setIsClient] = useState(false);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    setIsClient(true);
    const movementsArray = Array(5).fill(null).map(() => generateRandomMovements());
    setMovements(movementsArray);
  }, []);

  const renderAvatarSection = useMemo(() => (avatarData) => {
    return avatarData.map(({ id, image, avatarUrl, className, row, col }) => (
      <motion.div
        key={id}
        variants={fadeVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className={`${row} relative`}
      >
        <div className={col}>
          <Image
            src={image}
            alt={`Team Member ${id}`}
            priority={id === 1}
            placeholder="blur"
          />
        </div>
        <div className={`avatars ${className}`}>
          <img
            src={avatarUrl}
            alt={`Team Avatar ${id}`}
            className="avatar"
            loading="lazy"
          />
        </div>
      </motion.div>
    ));
  }, []);

  return (
    <UpContainers isClient={isClient} movements={movements}>
      <div className="up">
        {renderAvatarSection(avatarData)}
      </div>
    </UpContainers>
  );
}

export default React.memo(Up);
