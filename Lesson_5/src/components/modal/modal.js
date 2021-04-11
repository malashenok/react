import Modal from "@material-ui/core/Modal"
import React from "react"
import styles from "./modal.module.css"

const contacts = Array.from({ length: 50 }, (_, i) => `room${i}`)

export const AddContactModal = ({ isOpen, onClose, onClick }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Добавить участников</h2>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact}
              onClick={() => {
                onClick(contact)
              }}
            >
              {contact}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}
